document.addEventListener("DOMContentLoaded", initialize);

function initialize() {
    getStudentList().then(function(students){
        document.getElementById('students').innerHTML = students.map(buildStudentPanel).join('');

        // by default, get the first student automatically
        // loadStudentDetails(students[0].id);
    });

    // $( ".show-details" ).toggle(
    $('#students').on('click', '.show-details', function(e){
        e.preventDefault();
        var studentId = e.target.closest('li').id;
        loadStudentDetails(studentId);
    });

    $('#students').on('click', '.show-details', function(e){
        e.preventDefault();
        var studentId = e.target.closest('li').id;
        loadStudentDetails(studentId);
    });

    $('#students').on('click', '.show-full-bio', function(e){
        e.preventDefault();
        var studentId = e.target.closest('li').id;
        loadFullBio(studentId);
        e.target.remove();
    });    
    
    $('#students').on('click', '.hide-full-bio', function(e){
        e.preventDefault();
        var studentId = e.target.closest('li').id;
        hideFullBio(studentId);
        e.target.remove();
    });    
}

function loadStudentDetails(id)
{
    getStudent(id).then(function(studentDetails){
        document.getElementById(studentDetails.id).querySelector('.details').innerHTML = buildStudentDetails(studentDetails);    
    });
}

function loadFullBio(id)
{
    getStudentBio(id).then(function(studentBio){
        document.getElementById(studentBio.id).querySelector('.bio').innerHTML = buildStudentFullBio(studentBio);
    });
}

function hideFullBio(id)
{
       getStudent(id).then(function(studentDetails){
        document.getElementById(studentDetails.id).querySelector('.details').innerHTML = buildStudentDetails(studentDetails);    
    });
}

function getStudentList()
{
    return request('students/');
}

function getStudent(id)
{
    return request('students/' + id);
}

function getStudentBio(id)
{
    return request('students/' + id + '/bio');
}

function request(endpoint)
{
    var urlBase = 'http://148.75.251.185:8888/';
    return $.ajax({
        'type': 'GET',
        'url': urlBase + endpoint
    });
}

function buildStudentPanel(student) {
    return '<li id="' + student.id + '">'
            + '<a class="show-details" href="#">' + student.first_name + ' ' + student.last_name + '</a>'
            + '<div class="details"></div>'
            + '</li>' ; 
}

function buildStudentDetails(student){
    return '<label>EMAIL:</label> ' + student.email
            + '<br>'
            + '<label>TITLE:</label> ' + student.excerpt
            + '<div class="bio"></div>'
            + '<a class="show-full-bio" href="#">Read more</a>'
}

function buildStudentFullBio(student){
    return student.full_bio
            + '<br>'
            + '<a class="hide-full-bio" href="#">Hide</a>' 
}