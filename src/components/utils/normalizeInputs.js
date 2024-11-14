
function normalizeInputs(inputRefs = []) {

    inputRefs.map((ref) => {
        ref.current.classList.remove('outline-red-300')
        ref.current.classList.add('outline-mygreen-500')
    })

}

export default normalizeInputs
