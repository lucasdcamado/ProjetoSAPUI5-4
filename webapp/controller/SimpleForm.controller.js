sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/m/Dialog",
    "sap/ui/model/json/JSONModel",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Fragment, JSONModel, Dialog,) {
        "use strict";

        var aUsuarios = []; // Array para armazenar os usuários e senhas

        return Controller.extend("sap.fiori.simpleform1.controller.SimpleForm", {

    
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
            
                // Salve o tema escolhido para persistência, se necessário
                // localStorage.setItem("theme", sTheme);
            },

            onRegister: function(oEvent){
                var oButton1 = oEvent.getSource(),
                oView = this.getView();
    
                if (!this._pDialogRegister) {
                    this._pDialogRegister = Fragment.load({
                        id: oView.getId(),
                        name: "sap.fiori.simpleform1.view.PaginaCadastro",
                        controller: this
                    }).then(function(oDialog){
                        oView.addDependent(oDialog);
                        return oDialog;
                    });
                }
    
                this._pDialogRegister.then(function(oDialog){
                    oDialog.open();
                }.bind(this));
            },

            onVoltar2: function(){
                this._pDialogRegister.then(function(oDialog){
                    oDialog.close();
                }.bind(this));
            },

            onCreateUser: function(){
                // Obter os valores de entrada do novo usuário e senha
                var sNovoUsuario = this.byId("username").getValue();
                var sNovaSenha = this.byId("senha").getValue();

                if (sNovoUsuario && sNovaSenha) {
                    // Adicionar o novo usuário ao array
                    var oNovoUsuario = {
                        username: sNovoUsuario,
                        password: sNovaSenha
                    };
    
                    // Obter os usuários existentes no localStorage
                    // Se não existir, cria um array vazio ( || [] )
                    var aUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    
                    // Adicionar o novo usuário ao array existente
                    aUsuarios.push(oNovoUsuario);
    
                    // Armazenar o array atualizado no localStorage
                    localStorage.setItem("usuarios", JSON.stringify(aUsuarios));
                    
                    // Exibir uma mensagem de sucesso
                    sap.m.MessageToast.show("Conta criada com sucesso!");

                    // Você pode agora usar essa informação no login
                    console.log("Usuários: ", aUsuarios);

                    // Limpar o formulário
                    this.byId("name").setValue("");
                    this.byId("surname").setValue("");
                    this.byId("username").setValue("");
                    this.byId("email").setValue("");
                    this.byId("senha").setValue("");
                    this.byId("confirmsenha").setValue("");

                    this._pDialogRegister.then(function(oDialog){
                        oDialog.close();
                    }.bind(this));
                } else {
                    sap.m.MessageToast.show("Preencha todos os campos!");
                }
            },

            onConectar: function() {

                var sUsuario = this.byId("inputUser").getValue();
                var sSenha = this.byId("inputSenha").getValue();

                if (sUsuario.trim() === "" || sSenha.trim() === "") {
                    sap.m.MessageBox.information("Por favor, preencha os campos de login.", {title: "Aviso"});
                    return;
                    
                }

                var aUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

                var oUsuarioEncontrado = aUsuarios.find(function (usuario) {
                    return usuario.username === sUsuario && usuario.password === sSenha;
                });
    
                if (oUsuarioEncontrado) {
		            this._navigateTo("PaginaInicial");  // Nome da rota configurada no manifest.json
                    sap.m.MessageToast.show("Login bem-sucedido!");
                } else {
                    sap.m.MessageToast.show("Usuário ou senha incorretos!");
                }

            },

            onSenha: function () {
                var oPasswordInput = this.byId("inputSenha");
                var sType = oPasswordInput.getType();
    
                // Alterna o tipo entre Password e Text
                if (sType === "Password") {
                    oPasswordInput.setType("Text");
                } else {
                    oPasswordInput.setType("Password");
                }
            },


            onSenha1: function () {
                var oPasswordInput = this.byId("senha");
                var sType = oPasswordInput.getType();
    
                // Alterna o tipo entre Password e Text
                if (sType === "Password") {
                    oPasswordInput.setType("Text");
                } else {
                    oPasswordInput.setType("Password");
                }
            },

            onSenha2: function () {
                var oPasswordInput2 = this.byId("confirmsenha");
                var sType = oPasswordInput2.getType();
    
                // Alterna o tipo entre Password e Text
                if (sType === "Password") {
                    oPasswordInput2.setType("Text");
                } else {
                    oPasswordInput2.setType("Password");
                }
            },

            _navigateTo: function (sRoute) {
                // Função para navegação
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo(sRoute);
            }

        });
    });
