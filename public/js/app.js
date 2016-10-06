var app = angular.module('myApp', ['jsonFormatter'])
	.controller( 'mainController', function($scope, $http) {

		$scope.cargar = function(){
			//alert("cargando...");
			
			var cadena = $("#campotexto").val()
			//console.log($scope.campotexto);
			
			$scope.espera="esperando..."
			if(cadena!=""){
		    $http.get('/model/'+$("#campotexto").val())
		        .success(function(data) {
		            //console.log("dattos...");
		           
		            if(data!=[] && data.length>0){
		            	console.log(data);
		           		$scope.todos = data;
		           		$scope.espera="Datos mostrados";
		           	}
		           	else
		           		$scope.todos=[];
		           		$scope.espera="Sin resultados";
		            //console.log(data);
		        })
		        .error(function(data) {
		        	$scope.todos=[];
		            $scope.espera="Error de conexión";
		        });
		    }else{
		    	$scope.espera="Entrada no valida";
		    }
	    };
});