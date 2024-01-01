document.querySelector('#Documentop').addEventListener('click', function(){
    document.querySelector('#list').classList.toggle('hidden');
});

document.querySelector('#Close-menu').addEventListener('click', function(){
    document.querySelector('#menu-items').style.display = 'none';
});

document.querySelector('#menu').addEventListener('click', function(){
    document.querySelector('#menu-items').style.display = "block";

});
