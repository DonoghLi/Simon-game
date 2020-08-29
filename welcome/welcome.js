$("button").click(function (e) { 
    let name = $("input").val();
    localStorage.setItem("key", name);
});
