const field = document.querySelector('.field')

let dataIndex = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 'empty']

let winArr = [...dataIndex]

const x = 105

const matrix = setMatrix()




function shuffle(arr) {
   let currentIndex = arr.length, randomIndex
   while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex--
      [arr[currentIndex], arr[randomIndex]] = [arr[randomIndex], arr[currentIndex]]
   }
   return arr
}



function setMatrix() {
   let arr = []
   for (let i = 0; i < 4; i++) {
      let item = []
      for (let j = 0; j < 4; j++) {
         item.push(shuffle(dataIndex).pop())
      }
      arr.push(item)
   }
   return arr
}






function generateCell() {
   for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
         const cell = document.createElement('div')
         cell.textContent = matrix[i][j]
         if (cell.textContent === 'empty') {
            cell.className = 'cell empty'
         } else {
            cell.className = 'cell'
         }
         field.appendChild(cell)
         cell.addEventListener('click', function () {
            if (matrix[i][j + 1] === 'empty') {
               cell.style.transform = `translateX(${x}px)`
               matrix[i][j + 1] = matrix[i][j]
               matrix[i][j] = 'empty'
            } else if (matrix[i][j - 1] === 'empty') {
               cell.style.transform = `translateX(${-x}px)`
               matrix[i][j - 1] = matrix[i][j]
               matrix[i][j] = 'empty'
            }
            if (i <= 2) {
               if (matrix[i + 1][j] === 'empty') {
                  cell.style.transform = `translateY(${x}px)`
                  matrix[i + 1][j] = matrix[i][j]
                  matrix[i][j] = 'empty'
               }
            }
            if (i >= 1) {
               if (matrix[i - 1][j] === 'empty') {
                  cell.style.transform = `translateY(${-x}px)`
                  matrix[i - 1][j] = matrix[i][j]
                  matrix[i][j] = 'empty'
               }
            }
            setTimeout(() => {
               field.innerHTML = ''
               generateCell()
               cellCheck()
            }, 300)
         })
      }
   }
}

generateCell()


function cellCheck() {
   const cellItem = document.querySelectorAll('.cell')
   for (let i = 0; i < 16; i++) {
      if (cellItem[i].textContent == winArr[i]) {
         cellItem[i].classList.add('cell-right')
      }
   }
}

cellCheck()