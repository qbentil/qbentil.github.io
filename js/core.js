$(function () {

    const list = $(".mainList")
    const input = $('.todoInput')
    var todos = [];
    renderTodo = [];
    var id = 0;
    $('#total').text(todos.length)
    $('.addTodo').click(function () {
        text = input.val()
        if (isNaN(text)) {
            var today = new Date();
            var date = today.getFullYear() + '/' + today.getMonth() + '/' + today.getDate();
            var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
            todos = [...todos, {
                id: id++,
                input: text,
                date: date,
                time: time
            }]
            // console.log(todos);
            input.val('')

            // rendering each todos
            for (let i = 0; i < todos.length; i++) {
                var t = `
            <div class='list li'>
            <span class='upper'>
                <input type='checkbox' name='todoCheck' class='todoCheck' onchange ='todosChecked()'>
                <span class='todoName'>${todos[i].input}</span>
                <button class='close' onclick = 'this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode)' >&times;</button>
            </span>
            <small class='date'>Created: ${todos[i].date} | ${todos[i].time}</small>
            </div>
            `
                renderTodo = [...renderTodo, t]
            }
            list.append(renderTodo[renderTodo.length - 1])
            $('.mainList').show();
            $('.container').hide();
        } else {
            input.css("border", '1px solid red')
        }

        // removing error outline while typing
        input.keyup(function () {
            input.css("border", '1px solid turquoise')
        })
        // setting total count
        var total = 0;
        setInterval(() => {
            total = $('.list').length
            $('#total').text(total)
             // show home button on empty todo
            if($('.list').length == 0){
                $('.return').show();
                $('.return').click(function(){
                    todos = []
                    $('.mainList').hide();
                    $('.container').show();
                });
            }else{
                $('.return').hide();
            }
        }, 0);

    })
})

function todosChecked() {
    var checkbox = document.getElementsByClassName('todoCheck');
    var a = 0;
    for (let i = 0; i < checkbox.length; i++) {
        if (checkbox[i].checked == true) {
            a += 1;
        }
    }
    document.getElementById('checked').innerText = a;
}