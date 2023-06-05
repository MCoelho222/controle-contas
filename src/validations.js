class Validations {
    validateField(atr) {
        if(!atr) {
            return "Have something to say??"
        }
        return true
    }
    validateValue(atr) {
        if(atr <= 0) {
            return "It is too cheap, just can't believe!!"
        }
        return true
    }
}
export default new Validations()