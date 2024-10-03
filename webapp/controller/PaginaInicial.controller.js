sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/m/Dialog",
    "sap/ui/model/json/JSONModel",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Fragment, Dialog, JSONModel) {
        "use strict";

        return Controller.extend("sap.fiori.simpleform1.controller.PaginaInicial", {
            onInit: function () {
                this.getView().setModel(new sap.ui.model.json.JSONModel({
                    itens: [
                        { title: "Item 1", content: "Conteúdo do Item 1" },
                        { title: "Item 2", content: "Conteúdo do Item 2" },
                        { title: "Item 3", content: "Conteúdo do Item 3" }
                    ]
                }));
            },

            onConfig: function(oEvent){
                var oButton1 = oEvent.getSource(),
                oView = this.getView();
    
                if (!this._pDialogConfig) {
                     this._pDialogConfig = Fragment.load({
                        id: oView.getId(),
                        name: "sap.fiori.simpleform1.view.Config",
                        controller: this
                    }).then(function(oDialog){
                        oView.addDependent(oDialog);
                        return oDialog;
                    });
                }
    
                this._pDialogConfig.then(function(oDialog){
                    oDialog.open();
                }.bind(this));
            },

            onVoltar: function(){
                this._pDialogConfig.then(function(oDialog){
                    oDialog.close();
                }.bind(this));
            },
            
            SwitchMode: function() {
                var sCurrentTheme = sap.ui.getCore().getConfiguration().getTheme();
                var sNewTheme = (sCurrentTheme === "sap_horizon_dark") ? "sap_horizon" : "sap_horizon_dark";
                this.applyTheme(sNewTheme);
                },
            
              applyTheme: function(sTheme) {
                var oCore = sap.ui.getCore();
                oCore.applyTheme(sTheme);
            },

            onListSelect: function(oEvent){
                var oSelectedItem = oEvent.getSource().getSelectedItem();
                var oContext = oSelectedItem.getBindingContext();
                var sPath = oContext.getPath();
                var oItem = this.getView().getModel().getProperty(sPath);

                // Tornar a página de detalhes visível
                var oDetailPage = this.byId("DetailPage");
                oDetailPage.setVisible(true);

                // Atualizar o conteúdo da página de detalhes com base no item selecionado
                oDetailPage.removeAllContent(); // Limpa o conteúdo anterior
                oDetailPage.addContent(new sap.m.Text({ text: oItem.content }));
            }
        });
    });