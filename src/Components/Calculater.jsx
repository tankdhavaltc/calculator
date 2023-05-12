import { Box, Button, Card, Stack, Typography, } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import BackspaceIcon from '@mui/icons-material/Backspace';
import ClearIcon from '@mui/icons-material/Clear';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

const Calculater = () => {
    const [current, setCurrent] = useState("");
    const [prevoius, setPrevoius] = useState("");
    const [operations, setOperations] = useState("");

    const useStyles = makeStyles({
        mainBox: {
            margin: "3% 0%",
        },
        button: {
            width: "100px",
            height: "100px",
            borderRadius: "0px !important",
            fontSize: "32px!important",
            borderTop: "1px solid white !important",
            borderRight: "1px solid white !important",
        },
        bigButton: {
            width: "200px",
            height: "100px",
            fontSize: "32px!important",
            borderTop: "1px solid white !important",
            borderRight: "1px solid white !important",
        },
        previousText: {
            textAlign: "end",
            fontSize: "25px!important",
            display: "list-item"
        },
        currentText: {
            textAlign: "end",
            fontSize: "40px!important",
            display: "list-item"
        },
        screen: {
            backgroundColor: "#1976d2ab",
            padding: "10px 0px",
            minHeight: "100px",
            maxWidth: "402px",
            wordWrap: "break-word",
        },
        title: {
            textAlign: "center",
            fontSize: "40px !important",
            fontWeight: "bold",
            backgroundColor: "#2c87e3",
            color: "white",
        },
        card: {
            boxShadow: "0px 0px 9px 0px #979494 !important",
        },

    });

    const classes = useStyles();

    const appendValueHandler = useCallback((value) => {
        if (value === "." && current.includes(".")) return;
        setCurrent(prev => prev + value);
    }, [current]);

    const deleteHandler = useCallback(() => {
        setCurrent(String(current).slice(0, -1));
    }, [current]);

    const allclearHandler = () => {
        setCurrent("");
        setOperations("");
        setPrevoius("");
    };

    const calculate = useCallback(() => {
        let result;
        let previousNumber = parseFloat(prevoius);
        let currentNumber = parseFloat(current);
        if (isNaN(previousNumber) || isNaN(currentNumber)) return;
        switch (operations) {
            case "÷":
                result = previousNumber / currentNumber;
                break;
            case "/":
                result = previousNumber / currentNumber;
                break;
            case "x":
                result = previousNumber * currentNumber;
                break;
            case "*":
                result = previousNumber * currentNumber;
                break;
            case "+":
                result = previousNumber + currentNumber;
                break;
            case "-":
                result = previousNumber - currentNumber;
                break;
            default:
                return;
        }
        return result.toFixed(4);;
    }, [current, operations, prevoius]);

    const chooseOperationHandler = useCallback((operation) => {
        if (current === "") return;
        if (prevoius !== "") {
            let value = calculate();
            setPrevoius(value);
        } else {
            setPrevoius(current);
        }
        setCurrent("");
        setOperations(operation);
    }, [calculate, current, prevoius]);

    const equalHandler = useCallback(() => {
        let value = calculate();
        if (value === undefined || value == null) return;
        setCurrent(value);
        setPrevoius("");
        setOperations("");
    }, [calculate]);

    useEffect(() => {
        const handleKeyPress = (e) => {
            if ((e.code.includes("Digit") || e.code.includes("Numpad")) && e.code !== "NumpadEnter") {
                if (e.key === "+" || e.key === "-" || e.key === "/" || e.key === "*") {
                    chooseOperationHandler(e.key);
                } else {
                    appendValueHandler(e.key);
                }
            } else if (e.code.includes("Enter")) {
                equalHandler()
            } else if (e.code.includes("Delete")) {
                allclearHandler()
            }
        }
        window.addEventListener('keypress', handleKeyPress);
        return () => {
            window.removeEventListener('keypress', handleKeyPress);
        }
    }, [appendValueHandler, chooseOperationHandler, equalHandler])

    return (
        <Box className={classes.mainBox}>
            <Stack direction={"row"} justifyContent={"center"} alignItems={"center"}>
                <Card className={classes.card}>
                    <Typography className={classes.title}>Calculator</Typography>
                    <Box className={classes.screen}>
                        <Typography className={classes.previousText}>{prevoius} {operations}</Typography>
                        <Typography className={classes.currentText}>{current}</Typography>
                    </Box>
                    <Box>
                        <Stack direction={"row"}>
                            <Button onClick={allclearHandler} className={classes.bigButton} variant="contained" color="error" sx={{ borderRadius: "0px !important", borderLeft: "1px solid white !important", }}>AC</Button>
                            <Button onClick={deleteHandler} className={classes.button} variant="contained" color='warning' ><BackspaceIcon /></Button>
                            <Button onClick={() => chooseOperationHandler("÷")} className={classes.button} variant="contained" color="warning">÷</Button>
                        </Stack>
                        <Stack direction={"row"}>
                            <Button onClick={() => appendValueHandler("7")} className={classes.button} sx={{ borderLeft: "1px solid white !important" }} variant="contained">7</Button>
                            <Button onClick={() => appendValueHandler("8")} className={classes.button} variant="contained">8</Button>
                            <Button onClick={() => appendValueHandler("9")} className={classes.button} variant="contained">9</Button>
                            <Button onClick={() => chooseOperationHandler("x")} className={classes.button} variant="contained" color="warning"><ClearIcon /></Button>
                        </Stack>
                        <Stack direction={"row"}>
                            <Button onClick={() => appendValueHandler("4")} className={classes.button} sx={{ borderLeft: "1px solid white !important" }} variant="contained">4</Button>
                            <Button onClick={() => appendValueHandler("5")} className={classes.button} variant="contained">5</Button>
                            <Button onClick={() => appendValueHandler("6")} className={classes.button} variant="contained">6</Button>
                            <Button onClick={() => chooseOperationHandler("+")} className={classes.button} variant="contained" color="warning"><AddIcon /></Button>
                        </Stack>
                        <Stack direction={"row"}>
                            <Button onClick={() => appendValueHandler("1")} className={classes.button} sx={{ borderLeft: "1px solid white !important" }} variant="contained">1</Button>
                            <Button onClick={() => appendValueHandler("2")} className={classes.button} variant="contained">2</Button>
                            <Button onClick={() => appendValueHandler("3")} className={classes.button} variant="contained">3</Button>
                            <Button onClick={() => chooseOperationHandler("-")} className={classes.button} variant="contained" color="warning"><RemoveIcon /></Button>
                        </Stack>
                        <Stack direction={"row"}>
                            <Button onClick={() => appendValueHandler(".")} className={classes.button} sx={{ borderLeft: "1px solid white !important", borderBottom: "1px solid white !important", borderRadius: "0px 0px 0px 5px !important" }} variant="contained" color="success" >.</Button>
                            <Button onClick={() => appendValueHandler("0")} className={classes.button} sx={{ borderBottom: "1px solid white !important", }} variant="contained">0</Button>
                            <Button onClick={equalHandler} className={classes.bigButton} sx={{ borderBottom: "1px solid white !important", borderRadius: "0px 0px 5px 0px !important" }} variant="contained" color="warning" >=</Button>
                        </Stack>
                    </Box>
                </Card>
            </Stack>
        </Box >
    )
}




export default Calculater
