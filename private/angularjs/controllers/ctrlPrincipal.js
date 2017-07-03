/**
 * Created by anon on 30/11/16.
 */

/**
 * Controlador principal
 */
miApp.controller( 'ctrlPrincipal', ['$http', function($http) {
    var vm = this;
    vm.espera = false;
    vm.cadena=""
    vm.level=""
    console.log("controlador principal");
    vm.cargar = function(){

        vm.espera=true;
        if(vm.cadena!=="" && vm.level !== ""){
            $http.get('/crawl?q='+vm.cadena+'&level='+vm.level)
                .success(function(data){
                    vm.espera = false
                    //console.log("dattos...");

                    if(data!=[] && data.length>0){
                        //console.log(data);
                        vm.todos = data;
                        vm.espera=false
                    }
                    else{
                        vm.espera=false
                        vm.todos=[];

                    }
                    //console.log(data);
                })
                .error(function(data) {
                    console.log("error ",data)
                    vm.todos=[];
                    vm.espera=false;
                });
        }else{
            vm.espera=false;

        }
    };

}]);
