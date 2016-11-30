/**
 * Created by anon on 30/11/16.
 */

/**
 * Controlador principal
 */
miApp.controller( 'ctrlPrincipal', ['$http', function($http) {
    var vm = this;

    vm.cargar = function(){
        //alert("cargando...");
        var cadena = $("#campotexto").val()
        //console.log(vm.campotexto);

        vm.espera="esperando...";
        if(cadena!=""){
            $http.get('/model/'+cadena)
                .success(function(data){
                    //console.log("dattos...");

                    if(data!=[] && data.length>0){
                        console.log(data);
                        vm.todos = data;
                        vm.espera="Datos mostrados";
                    }
                    else{
                        vm.espera="Sin resultados";
                        vm.todos=[];

                    }
                    //console.log(data);
                })
                .error(function(data) {
                    vm.todos=[];
                    vm.espera="Error de conexión";
                });
        }else{
            vm.espera="Entrada no valida";
        }
    };

}]);
