
function invalidateInputs(ref) {
    ref.current.classList.add('outline-red-300')
    ref.current.classList.add('outline')
    ref.current.classList.remove('outline-mygreen-500')
}

export default invalidateInputs