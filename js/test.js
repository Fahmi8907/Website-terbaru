let textarea = document.getElementById('textarea')
let choiceContainer = document.getElementById('choiceContainer')
let tagElement = document.querySelectorAll('.tags')
let btn = document.getElementById('btn')
let int = 100

textarea.addEventListener('keyup', (e) => {
  // console.log(e.target.value);
  createTags(e.target.value)
})


btn.addEventListener('click', () => {
  tagElement.forEach((tag) => {
    tag.classList.remove('select')
  })
  pickRandom()
})

function pickRandom() {

  //Create Animation
  if (choiceContainer.childElementCount > 1) {
    let animateTags = setInterval(selectTag, int)
    setTimeout(() => {
      clearInterval(animateTags)
      let random = Math.floor(Math.random() * choiceContainer.childElementCount)
      choiceContainer.children[random].classList.add('select')

    }, 3000)
  } else {
    alert('Please Enter Your Choices!')
  }

}

function selectTag(arg) {
  //console.log('it works');


  let random = Math.floor(Math.random() * choiceContainer.childElementCount)
  choiceContainer.children[random].classList.add('select')

  setTimeout(() => {
    choiceContainer.children[random].classList.remove('select')

  }, int)


  // alert(random)
}

function createTags(input) {
  let tags = input.split(",").filter((tag) => { return tag.trim() !== "" }).map((tag) => { return tag.trim() })
  // console.log(tags);

  choiceContainer.innerHTML = ''

  tags.forEach((tag) => {
    let div = document.createElement('DIV')
    div.setAttribute('class', 'tags')
    div.innerText = tag
    choiceContainer.appendChild(div)
  })

document.getElementById("hitungBtn").addEventListener("click", function () {
            let num1 = parseFloat(document.getElementById("num1").value);
            let num2 = parseFloat(document.getElementById("num2").value);
            let operator = document.getElementById("operator").value;
            let hasilElement = document.getElementById("hasil");

            if (isNaN(num1) || isNaN(num2)) {
                hasilElement.textContent = "Masukkan angka yang valid!";
                return;
            }

            let hasil;
            switch (operator) {
                case "+":
                    hasil = num1 + num2;
                    break;
                case "-":
                    hasil = num1 - num2;
                    break;
                case "*":
                    hasil = num1 * num2;
                    break;
                case "/":
                    hasil = num2 !== 0 ? num1 / num2 : "Tidak bisa bagi 0!";
                    break;
                default:
                    hasil = "Operator tidak valid!";
            }
            hasilElement.textContent = hasil;
        });
}
