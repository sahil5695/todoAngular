var app = angular.module("mainApp",[]);

app.controller("mainController",function($scope,$http){

    

    $http.get("/api/todo").success(function(data){
        $scope.todos = data;
    });

    $scope.todos = [];

    console.log($scope.todos);

    $scope.newt = {todo:"",complete:false};
    $scope.showerr = false;
    $scope.addTodo = function(newt){
        if($scope.newTodo){
            $scope.newt.todo = $scope.newTodo;
            console.log(newt);
            $http.post("/api/todo",newt).success(function(data){
                $scope.todos = data;
            });
            $scope.newt = {todo:"",complete:false};
        } else {
            $scope.showerr = true;
            setTimeout(function(){
                $scope.showerr = false;
            },1000)
        }
        $scope.newt = {todo:"",complete:false};
    };

    $scope.deleteTodo = function(id){
        $http.delete("/api/todo/"+id).success(function(data){
            $scope.todos = data;
        });
    };

    $scope.userTodo = function(picked){
        $http.put("/api/todo",picked).success(function(data){
            $scope.todos = data;
        })
    };
     $scope.updateDone = function(taken){

        $http.put("/api/todo/complete",taken).success(function(data){
            $scope.todos = data;
        });
    };
    
});