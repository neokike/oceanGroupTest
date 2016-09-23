"use strict";angular.module("app",["ui.router","toastr","validation","validation.rule","datatables","datatables.bootstrap","datatables.select","ngSanitize"]);var app=angular.module("app").config(["$validationProvider","toastrConfig",function(r,a){angular.extend(a,{positionClass:"toast-bottom-right"}),r.showSuccessMessage=!1,r.setErrorHTML(function(r){return'<div> <label class="control-label text-danger">'+r+"</label></div>"}),r.setDefaultMsg({required:{error:"Campo requerido",success:"Thanks!"},minlength:{error:"El campo debe contener más caracteres",success:"Thanks!"},maxlength:{error:"El campo debe contener menos caracteres",success:"Thanks!"},email:{error:"El formato del email es incorrecto"}}),r.setExpression({cedula:/^^[[V|E|J|G]\d\d\d\d\d\d\d?\d?]{0,9}$/}).setDefaultMsg({cedula:{error:"El formato de la cedula es incorrecto debe ser V|E|J|G00000000"}})}]).run(["$rootScope",function(r){}]);angular.module("app").config(["$stateProvider","$urlRouterProvider",function(r,a){r.state("trabajadores",{url:"/trabajadores",template:"<div ui-view></div>"}).state("trabajadores.listar",{url:"/listar",controller:"listarTrabajadoresCtrl as listarVm",templateUrl:"html/trabajadores/views/listarTrabajadores.html"}).state("trabajadores.nuevo",{url:"/nuevo",controller:"crearTrabajadorCtrl as verVm",templateUrl:"html/trabajadores/views/verTrabajador.html"}).state("trabajadores.editar",{url:"/editar/{id}",controller:"editarTrabajadorCtrl as verVm",templateUrl:"html/trabajadores/views/verTrabajador.html"}).state("arbol",{url:"/arbol",controller:"arbolCtrl as arbolVm",templateUrl:"html/arbol/views/arbol.html"})}]);var app=angular.module("app"),injectParams=["$http","$q"],factory=function(r,a){return factory={},factory.getAll=function(e,t){var o=a.defer(),n=o.promise,i=e.indexOf("page")!==-1;return t=t?i?"&include="+t:"?include="+t:"",r.get(e+t).success(function(r){o.resolve(r)}).error(function(r){o.reject(r)}),n},factory.getOne=function(e,t,o){var n=a.defer(),i=n.promise;return o=o?"?include="+o:"",t+="/",r.get(t+e+o).success(function(r){n.resolve(r)}).error(function(r){n.reject(r)}),i},factory.remove=function(e,t){var o=a.defer(),n=o.promise;return t+="/",r["delete"](t+e).success(function(r){o.resolve(r.data)}).error(function(r){o.reject(r)}),n},factory.removeMany=function(e,t){var o=a.defer(),n=o.promise;return r["delete"](t+"/id/"+e).success(function(r){o.resolve(r.data)}).error(function(r){o.reject(r)}),n},factory.save=function(e,t){var o=a.defer(),n=o.promise;return r.post(t,e).success(function(r){o.resolve(r)}).error(function(r){o.reject(r)}),n},factory.create=function(e,t){var o=a.defer(),n=o.promise;return r.post(t,e).success(function(r){o.resolve(r)}).error(function(r){o.reject(r)}),n},factory.update=function(e,t,o){var n=a.defer(),i=n.promise;return o+="/",r.put(o+e,t).success(function(r){n.resolve(r)}).error(function(r){n.reject(r)}),i},factory.uploadFile=function(e,t){var o=a.defer(),n=(o.promise,new FormData);return n.append("file",t),r.post(e,n,{headers:{"Content-type":void 0},transformRequest:n}).success(function(r){o.resolve(r)}).error(function(r,a){o.reject(r)})},factory};factory.$inject=injectParams,app.factory("apiService",factory),angular.module("app").controller("arbolCtrl",["apiService","toastr","$scope",function(r,a,e){var t=this;t.data=[{id:0,padreid:null,nombre:"Carros"},{id:1,padreid:null,nombre:"Computadoras"},{id:2,padreid:0,nombre:"Rines"},{id:3,padreid:2,nombre:"Perfil Bajo"},{id:4,padreid:3,nombre:"Lujo"},{id:5,padreid:0,nombre:"Repuestos"},{id:6,padreid:4,nombre:"momo"},{id:7,padreid:1,nombre:"software"},{id:8,padreid:5,nombre:"Motores"},{id:9,padreid:7,nombre:"Juegos"},{id:10,padreid:7,nombre:"Administrativos"},{id:11,padreid:null,nombre:"Animales"},{id:12,padreid:1,nombre:"Hardware"},{id:13,padreid:11,nombre:"Perros"},{id:14,padreid:11,nombre:"Gatos"},{id:15,padreid:null,nombre:"Hogar"},{id:16,padreid:9,nombre:"Estrategia"},{id:17,padreid:9,nombre:"Rol"}],t.procesando=!1,t.dataStr=JSON.stringify(t.data),t.generar=function(){try{t.data=JSON.parse(t.dataStr),t.html="",t.procesando=!0,r.create(t.data,"api/arbol").then(function(r){t.html=r.data.html,a.success("El árbol fue generado con exito","Exito")})["catch"](function(r){a.error(r.error.mensaje)})["finally"](function(){t.procesando=!1})}catch(e){a.error("El formato de la data es incorrecto, este debe ser un string Json valido.","Error")}}}]),angular.module("app").controller("crearTrabajadorCtrl",["apiService","toastr","$state",function(r,a,e){function t(){r.getAll("api/cargos").then(function(r){o.cargos=r})}var o=this;o.editar=!1,o.procesando=!1,o.trabajador={},o.cargos=[],t(),o.guardar=function(){o.procesando=!0,r.create(o.trabajador,"api/trabajadores").then(function(r){a.success("El trabajador se creo satisfactoriamente","Exito"),e.go("trabajadores.listar")})["catch"](function(r){angular.forEach(r,function(r,e){a.error(r[0],"Error")})})["finally"](function(){o.procesando=!1})}}]),angular.module("app").controller("editarTrabajadorCtrl",["apiService","toastr","$state","$stateParams",function(r,a,e,t){function o(){r.getAll("api/cargos").then(function(r){i.cargos=r})}function n(e){var t="api/trabajadores";i.procesando=!0,r.getOne(e,t).then(function(r){i.trabajador=r.data})["catch"](function(r){a.error(r.error.mensaje,"error")})["finally"](function(){i.procesando=!1})}var i=this;i.editar=!0,i.procesando=!1,i.trabajador={},o(),n(t.id),i.guardar=function(){i.procesando=!0,r.update(t.id,i.trabajador,"api/trabajadores").then(function(r){a.success("El trabajador se actualizo satisfactoriamente","Exito"),e.go("trabajadores.listar")})["catch"](function(r){angular.forEach(r,function(r,e){a.error(r[0],"Error")})["finally"](function(){i.procesando=!1})})},i.eliminar=function(){var o="api/trabajadores",n=window.confirm("¿Esta seguro de eliminar este registro?");1==n&&(i.procesando=!0,r.remove(t.id,o).then(function(r){a.success("Trabajador eliminado con exito"),e.go("trabajadores.listar")})["catch"](function(r){a.error(r.errors[0].message,"Error")})["finally"](function(){i.procesando=!1}))}}]),angular.module("app").controller("listarTrabajadoresCtrl",["apiService","toastr","DTOptionsBuilder","DTColumnBuilder","$compile","$scope",function(r,a,e,t,o,n){function i(r,a,e){o(angular.element(r).contents())(n)}function s(r,a,e,t){return'<a ui-sref="trabajadores.editar({ id: '+e.id+' })">'+e.cedula+"</a>"}function c(r,a,e,t){return'<a ui-sref="trabajadores.editar({ id: '+e.id+' })">'+e.apellido+"</a>"}function d(r,a,e,t){return'<a ui-sref="trabajadores.editar({ id: '+e.id+' })">'+e.nombre+"</a>"}function l(r,a,e,t){var o=e.activo?"Desactivar":"Activar",n=e.activo?"fa-circle-o":"fa-check-circle",i=e.activo?"btn-info":"btn-success";return'<div class="actions-btn"> <a class="btn btn-sm btn-warning" ui-sref="trabajadores.editar({id:'+e.id+'})"><i class="fa fa-pencil"></i> Editar</a> &nbsp;<a class="btn btn-sm btn-danger" ng-click="listarVm.eliminar('+e.id+')"><i class="fa fa-trash"></i> Eliminar</a> &nbsp;<a class="btn btn-sm '+i+'" ng-click="listarVm.activacion('+e.id+","+e.activo+')"><i class="fa '+n+'"></i> '+o+"</a></div>"}function u(r,a,e,t){var o=e.activo?"fa-check-circle":"fa-circle-o",n=e.activo?"text-success":"text-danger";return"<i class='fa fa-2x "+o+" "+n+"'></i>"}var f=this;f.dtInstance={},f.dtOptions=e.newOptions().withOption("ajax",{url:"api/trabajadores",type:"GET"}).withOption("processing",!0).withOption("serverSide",!0).withBootstrap().withOption("language",{url:"/js/es.json"}).withOption("createdRow",i).withDataProp("data"),f.dtColumns=[t.newColumn("cedula").withTitle("Cédula").renderWith(s),t.newColumn("nombre").withTitle("Nombre").renderWith(d),t.newColumn("apellido").withTitle("Apellido").renderWith(c),t.newColumn("email").withTitle("Email"),t.newColumn("cargo.nombre").withTitle("Cargo"),t.newColumn("activo").withTitle("Activo").renderWith(u),t.newColumn("acciones").withTitle("Acciones").renderWith(l).withOption("width","340px")],f.eliminar=function(e){var t="api/trabajadores";if(e){var o=window.confirm("¿Esta seguro de eliminar este registro?");1==o&&r.remove(e,t).then(function(r){a.success("Registro eliminado con exito"),f.dtInstance.reloadData()})["catch"](function(r){a.error(r.errors[0].message,"Error")})}else a.warning("Debe seleccionar un trabajador antes de continuar")},f.activacion=function(e,t){var o="api/trabajadores/activacion";e?r.update(e,{},o).then(function(r){t?a.success("Trabajador desactivado con exito"):a.success("Trabajador activado con exito"),f.dtInstance.reloadData()})["catch"](function(r){a.error(r.errors[0].message,"Error")}):a.warning("Debe seleccionar un trabajador antes de continuar")}}]);