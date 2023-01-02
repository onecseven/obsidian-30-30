import {
  App,
  Editor,
  MarkdownView,
  Modal,
  Notice,
  Plugin,
  PluginSettingTab,
  Setting,
  ItemView,
  WorkspaceLeaf,
} from "obsidian"
import parser from "src/parser"
import { ReactView } from "./src/App"
import * as React from "react"
import * as ReactDOM from "react-dom"
import { createRoot } from "react-dom/client"
// Remember to rename these classes and interfaces!

interface MyPluginSettings {
  mySetting: string
}

const DEFAULT_SETTINGS: MyPluginSettings = {
  mySetting: "default",
}

const VIEW_TYPE_EXAMPLE = "30/31"

export default class MyPlugin extends Plugin {
  settings: MyPluginSettings
    
  async activateView() {
    this.app.workspace.detachLeavesOfType(VIEW_TYPE_EXAMPLE);

    await this.app.workspace.getRightLeaf(false).setViewState({
      type: VIEW_TYPE_EXAMPLE,
      active: true,
    });

    this.app.workspace.revealLeaf(
      this.app.workspace.getLeavesOfType(VIEW_TYPE_EXAMPLE)[0]
    );
  }
  
  async onload() {

    this.registerView(
      VIEW_TYPE_EXAMPLE,
      (leaf) => new SampleModal(leaf)
    )
    // This creates an icon in the left ribbon.
    this.addRibbonIcon(
      "dice",
      "Sample Plugin",
      (evt: MouseEvent) => {
        this.activateView()
      }
    )
    // Perform additional things with the ribbon
    // ribbonIconEl.addClass("my-plugin-ribbon-class")

    // This adds a status bar item to the bottom of the app. Does not work on mobile apps.
    // const statusBarItemEl = this.addStatusBarItem()
    // statusBarItemEl.setText("Status Bar Text")

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
      editorCallback: (editor: Editor, view: MarkdownView) => {
        console.log(`does the file contain a tasklisk block`)
        console.log(parser(view))
      },
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

  onunload() {
    this.app.workspace.detachLeavesOfType(VIEW_TYPE_EXAMPLE);
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
    return VIEW_TYPE_EXAMPLE
  }

  getDisplayText() {
    return "Example view"
  }

  async onOpen() {
    const root = createRoot(this.containerEl.children[1])
    root.render(
      <React.StrictMode>
        <ReactView />
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
