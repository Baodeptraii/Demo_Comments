// Đây là database, khi cmt dữ liệu sẽ đc up lên đó

var myAPI = "http://localhost:3000/comments";

function start() {
    getCMT(comments => {
        renderCMT(comments);
    })

    createForm();
}
start();

function getCMT(callback) {
    fetch(myAPI)
        .then(response => {
            return response.json();
        })
        .then(callback);
}


function createCMT(data, callback) {
    fetch(myAPI, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => {
            return response.json();
        })
        .then(callback);
}

function deleteCMT(data) {

    fetch(myAPI + "/" + data, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => {
            return response.json();
        })
        .then(() => {
            var delCMT = document.querySelector('.CMT' + data);
            if (delCMT) {
                delCMT.remove();
            }
        });
}

function renderCMT(comments) {
    var cmtBlock = document.querySelector("#comments");
    var htmls = comments.map(comment => {
        return `
            <li class="CMT${comment.id}" style="
            padding-left: 20px">
                <h4>${comment.name}</h4>
                <p>${comment.content}</p>
                <button onclick="deleteCMT('${comment.id}')" >Xóa</button>
            </li> 
        `
    })
    cmtBlock.innerHTML = htmls.join("");
}

function createForm() {
    var createBtn = document.querySelector("#create");
    createBtn.onclick = () => {
        var nameInput = document.querySelector('input[name="name"]');
        var contentInput = document.querySelector('input[name="content"]');
        var name = nameInput.value;
        var content = contentInput.value;

        if (name && content) {
            var data = {
                name: name,
                content: content
            }
            createCMT(data, () => {
                getCMT(comments => {
                    renderCMT(comments);
                    // Clear input values
                    nameInput.value = '';
                    contentInput.value = '';
                });
            });
        } else {
            alert("Vui lòng nhập đầy đủ thông tin !!!");
        }
    }
    
}

