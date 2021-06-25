function chapter1Load() {
    console.log("chapter 1 loaded")
    simplePhysic.elements = [];
    simplePhysic.simulate();
}

$("#scene__simplePhysic").click(function (e) { 
    e.preventDefault();
    simplePhysic.addCircle(50, e.pageX - 50, e.pageY - 25);
});


