/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

var jpdbBaseURL = "http://api.login2explore.com:5577";
var jpdbIRL = '/api/irl';
var jpdbIML = '/api/iml';
var stdDBName = "Student";
var stdRelationName = "Student-Rel"; 
var connToken = "90931804|-31949306269862559|90963074" ;

$("#stdid").focus();

function saveRecNo2LS(jsonObj) {
    var lvData = JSON.parse(jsonObj.data);
    localStorage.setItem("recno", lvData.rec_no);
}
function getStdIdAsJsonObj() {
    var stdid = $("#stdid").val();
    var jsonStr = {
        id: stdid
    };
    return JSON.stringify(jsonStr);
}

function fillData(jsonObj) {
    saveRecNo2LS(jsonObj);
    var record = JSON.parse(jsonObj.data).record;
    $("#stdname").val(record.name) ;
    $("#stdclass").val(record.class);
    $("#stdbd").val(record.birthdate);
    $("#stdadd").val(record.address) ;
    $("#stdenroll").val(record.enrollmentdate);
}

function resetForm(){
    $("#stdid").val("");
    $("#stdname").val("");
    $("#stdclass").val("");
    $("#stdbd").val("");
    $("#stdadd").val("") ;
    $("#stdenroll").val("");
    $("#stdid").prop("disabled", false);
    $("#save").prop("disabled", true);
    $("#change").prop( "disabled", true);
    $("#reset").prop("disabled", true);
    $("#stdid").focus();
}

function getStd() {
    var stdIdJsonObj = getStdIdAsJsonObj();
    var getRequest = createGET_BY_KEYRequest(connToken, stdDBName, stdRelationName, stdIdJsonObj);
    jQuery.ajaxSetup ({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(getRequest, jpdbBaseURL, jpdbIRL);
    jQuery.ajaxSetup({async: true});
    if (resJsonObj.status === 400){
        $("#save").prop("disabled", false);
        $("#reset").prop("disabled", false);
        $("#stdname").focus();
    }
    else if (resJsonObj.status=== 200) {
        $("#stdid").prop("disabled", true);
        fillData(resJsonObj);
        $("#change").prop( "disabled", false);
        $("#reset").prop("disabled", false);
        $("#stdname").focus();
    }
}

function validateData(){
    var stdid, stdname, stdclass, stdbd, stdadd, stdenroll;
    stdid=$("#stdid").val();
    stdname=$("#stdname").val();
    stdclass=$("#stdclass").val();
    stdbd=$("#stdbd").val();
    stdadd=$("#stdadd").val() ;
    stdenroll=$("#stdenroll").val();
    if(stdid===""){
        alert("Student Roll no. Missing");
        $("#stdid").focus();
        return "";
    }
    if(stdname===""){
        alert("Student Name Missing");
        $("#stdname").focus();
        return "";
    }
    if(stdclass===""){
        alert("Student Class Missing");
        $("#stdclass").focus();
        return "";
    }
    if(stdbd===""){
        alert("Student Birth Date Missing");
        $("#stdbd").focus();
        return "";
    }
    if(stdadd===""){
        alert("Student Address Missing");
        $("#stdadd").focus();
        return "";
    }
    if(stdenroll===""){
        alert("Student Enrollment Date Missing");
        $("#stdenroll").focus();
        return "";
    }
    var JsonStrObj={
        id:stdid,
        name:stdname,
        class:stdclass,
        birthdate:stdbd,
        address:stdadd,
        enrollmentdate:stdenroll
    };
    return JSON.stringify(JsonStrObj);
}

function saveData() {
    var jsonStrObj = validateData();
    if (jsonStrObj===""){
    return "";}
    var putRequest = createPUTRequest(connToken, jsonStrObj, stdDBName, stdRelationName);
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(putRequest, jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({async: true});
    resetForm();
    $("#stdid").focus();
}

function changeData() {
    $("#change").prop("disabled", true);
    var jsonChg = validateData();
    var updateRequest = createUPDATERecordRequest(connToken, jsonChg, stdDBName, stdRelationName, localStorage.getItem("recno"));
    jQuery.ajaxSetup({async: false});
    var resJsonobj = executeCommandAtGivenBaseUrl(updateRequest, jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup ({async: true});
    console.log(resJsonobj);
    resetForm() ;
    $("#stdid").focus();
} 