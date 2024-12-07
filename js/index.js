function toggleSections(showSectionId, hideSectionId) {
    document.getElementById(showSectionId).classList.remove('hidden');
    document.getElementById(hideSectionId).classList.add('hidden');
}
document.getElementById('tab-section').addEventListener('click', function (e) {
    if (document.getElementById('tab-section') != e.target) {
        const btnCollection = e.target.parentNode.parentNode.children;

        for (const element of btnCollection) {
            element.children[0].classList.remove('bg-primary')

        }
        e.target.classList.add('bg-primary')
        if (e.target.innerText === 'History') {
            toggleSections('history-section','card-section') 
        }
        else {
            toggleSections('card-section','history-section')
            
        }

    }
})

function convertNumber(text) {
    const number = parseFloat(text)
    return number
}
// donate
function donateNow(e) {
    if (e.previousElementSibling.children[0].value === '') {
        alert('Input field can not be empty')
        e.previousElementSibling.children[0].value = ''
        return;
    }
    const numberValue = convertNumber(e.previousElementSibling.children[0].value);
    if (isNaN(numberValue) || numberValue <= 0) {
        alert('please give a valid number')
        e.previousElementSibling.children[0].value = ''
        return;
    }
    const numberTotalAmount = convertNumber(document.querySelector('#total-amount').innerText)
    if (numberTotalAmount < numberValue) {
        alert('Your account balance is low')
        e.previousElementSibling.children[0].value = ''
        return;
    }
    const afterDeduction = numberTotalAmount - numberValue
    document.querySelector('#total-amount').innerText = afterDeduction
    e.previousElementSibling.children[0].value = ''
    //individual total amount
    const individualNumberTotalAmount = convertNumber(e.previousElementSibling.children[0].parentNode.parentNode.children[0].children[1].innerText) + numberValue
    e.previousElementSibling.children[0].parentNode.parentNode.children[0].children[1].innerText = individualNumberTotalAmount

    //history
    const historyText = e.previousElementSibling.children[0].parentNode.parentNode.children[1].innerText;
    const dateTime = new Date();
    const splittedText = historyText.split(' ')
    const slicedText = splittedText.slice(1, splittedText.length)
    const joinedText = slicedText.join(' ');
    document.getElementById('history-section').innerHTML += `<div class='border border-white-[#FFFFFF] rounded-xl p-7 mt-3'>
<p class='font-semibold text-xl'>${numberValue} Taka is donated ${joinedText}</p>
<p class='text-[#111111B3] text-base mt-3'>Date:${dateTime}<p></div>
`
    my_modal_5.showModal()
}