import {
  App,
  Editor,
  MarkdownView,
  Plugin,
  PluginSettingTab,
  Notice,
  Setting,
  ItemView,
  WorkspaceLeaf,
} from "obsidian"
import parser from "src/parser"
import Opp from "./src/App"
import * as React from "react"
import * as ReactDOM from "react-dom"
import { createRoot } from "react-dom/client"
import { PickerStor, TimerStore, TaskStor } from "src/store/vanillastore"
import { seconds_to_mmss } from "src/components/Shared/seconds_to_mmss"
// Remember to rename these classes and interfaces!

interface MyPluginSettings {
  mySetting: string
}

const DEFAULT_SETTINGS: MyPluginSettings = {
  mySetting: "default",
}

const TIMER_VIEW_TYPE = "30/31"

export default class MyPlugin extends Plugin {
  settings: MyPluginSettings
  status_bar: HTMLElement
  async activateView() {
    this.app.workspace.detachLeavesOfType(TIMER_VIEW_TYPE)

    await this.app.workspace.getRightLeaf(false).setViewState({
      type: TIMER_VIEW_TYPE,
      active: true, 
    })
  
    this.app.workspace.revealLeaf(
      this.app.workspace.getLeavesOfType(TIMER_VIEW_TYPE)[0]
    )
  }

  async onload() {
    this.registerView(TIMER_VIEW_TYPE, (leaf) => new SampleModal(leaf))
    // This creates an icon in the left ribbon.
    this.addRibbonIcon("timer", "30/31", async (evt: MouseEvent) => {
      if (this.app.workspace.getLeavesOfType(TIMER_VIEW_TYPE).length > 0)
        this.app.workspace.detachLeavesOfType(TIMER_VIEW_TYPE)
      else this.activateView()
    })

    // This adds a status bar item to the bottom of the app. Does not work on mobile apps.
    this.status_bar = this.addStatusBarItem()
    TaskStor.subscribe((state) => {
      if (state.status === "TICKING")
        this.status_bar.innerHTML = `<span>[Task: <u><strong>${state.name}</strong></u> - ${seconds_to_mmss(state.remaining_seconds)}]</span>`
      else this.status_bar.setText("[Timer Paused]")
    })

    // This adds a simple command that can be triggered anywhere
    // this.addCommand({
    // 	id: 'parse-current-file',
    // 	name: 'Open sample modal (simple)',
    // 	callback: () => {
    // 		new SampleModal(this.app).open();
    // 	}
    // });
    // This adds an editor command that can perform some operation on the current editor instance

    this.addCommand({
      id: "parse-current-file",
      name: "parse-current-file",
      editorCallback: (editor: Editor, view: MarkdownView) =>
        this.parse(view.data),
    })

    // this.addCommand({
    //   id: "open-sample-modal-complex",
    //   name: "Open sample modal (complex)",
    //   checkCallback: (checking: boolean) => {
    //     // Conditions to check
    //     const markdownView =
    //       this.app.workspace.getActiveViewOfType(MarkdownView)
    //     if (markdownView) {
    //       // If checking is true, we're simply "checking" if the command can be run.
    //       // If checking is false, then we want to actually perform the operation.
    //       if (!checking) {
    //         new SampleModal(this.app.workspace.).open()
    //       }

    //       // This command will only show up in Command Palette when the check function returns true
    //       return true
    //     }
    //   },
    // })

    // This adds a settings tab so the user can configure various aspects of the plugin
    // this.addSettingTab(new SampleSettingTab(this.app, this));

    // If the plugin hooks up any global DOM events (on parts of the app that doesn't belong to this plugin)
    // Using this function will automatically remove the event listener when this plugin is disabled.
    // this.registerDomEvent(document, 'click', (evt: MouseEvent) => {
    // 	console.log('click', evt);
    // });

    // When registering intervals, this function will automatically clear the interval when the plugin is disabled.
    // this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));
  }

  parse(data: string) {
    let tasklists = parser(data)
    if (tasklists.length) {
      TimerStore.getState().dispatch("setTaskList", tasklists[0])
      PickerStor.getState().dispatch("set", tasklists)
    } else {
      new Notice("No timer found - Check formatting.")
    }
  }

  onunload() {
    this.app.workspace.detachLeavesOfType(TIMER_VIEW_TYPE)
    this.status_bar.remove()
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData())
  }

  async saveSettings() {
    await this.saveData(this.settings)
  }
}

class SampleModal extends ItemView {
  constructor(leaf: WorkspaceLeaf) {
    super(leaf)
  }

  getViewType() {
    return TIMER_VIEW_TYPE
  }

  getDisplayText() {
    return "30/31"
  }

  async onOpen() {
    const root = createRoot(this.containerEl.children[1])
    root.render(
      <React.StrictMode>
        <Opp />
      </React.StrictMode>
    )
  }

  async onClose() {
    ReactDOM.unmountComponentAtNode(this.containerEl.children[1])
  }
}

class SampleSettingTab extends PluginSettingTab {
  plugin: MyPlugin

  constructor(app: App, plugin: MyPlugin) {
    super(app, plugin)
    this.plugin = plugin
  }

  display(): void {
    const { containerEl } = this

    containerEl.empty()

    containerEl.createEl("h2", { text: "Settings for my awesome plugin." })

    new Setting(containerEl)
      .setName("Setting #1")
      .setDesc("It's a secret")
      .addText((text) =>
        text
          .setPlaceholder("Enter your secret")
          .setValue(this.plugin.settings.mySetting)
          .onChange(async (value) => {
            console.log("Secret: " + value)
            this.plugin.settings.mySetting = value
            await this.plugin.saveSettings()
          })
      )
  }
}
