class JSONService {
    constructor($http){
        this.$http = $http
    }

    getSemesterData() {
        return this.$http({
            method: 'GET',
            url: '../data.json',
        })
    }
    getClassData() {
        return this.$http({
            method: 'GET',
            url: '../addClass.json',
        })
    }

}

angular
    .module('common')
    .service('JSONService', JSONService);