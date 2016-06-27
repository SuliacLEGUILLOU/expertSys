/*
 *  This file define the logical operation taking care of the undefined state
 */
function op_and(op1, op2) {
    //console.log(op1 + ' and ' + op2);
    if (op1 === -1 || op2 === -1) {
        return (-1);
    }
    else if (!op1 || !op2) {
        return (0);
    }
    return (1);
}

function op_or(op1, op2) {
    //console.log(op1 + ' or ' + op2);
    if (op1 === 1 || op2 === 1) {
        return (1);
    }
    else if (!op1 || !op2) {
        return (0);
    }
    return (-1);
}

function op_xor(op1, op2) {
    //console.log(op1 + ' xor ' + op2);
    if (!op2 || !op2) {
        return (0);
    }
    else if (op1 === op2) {
        return (-1);
    }
    return (1);
}