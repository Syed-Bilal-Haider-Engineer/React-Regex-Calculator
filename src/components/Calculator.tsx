'use client';

import React, {useCallback, useState} from 'react';
import {ExpressionInput} from './ExpressionInput';
import {Results} from './Results';
import Calculation from '@/logic/calculation';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

export const Calculator = () => {
  const [result, setResult] = useState<number | string>('');
  const [history, setHistory] = useState<string[]>([]);
  const [clearExpressionState, setClearExpressionState] = useState(false);

  const calculateResult = useCallback(
    (input: string) => {
      const calculationResult = new Calculation(input).calculate();
      if (calculationResult !== undefined) {
         setResult(calculationResult);
         setHistory((prev:string[]) => [`${input} = ${calculationResult}`, ...prev]);
      }
       else {
        setResult("Wrong input!");
      }
    },
    [setResult]
  );

  const handleClear = useCallback(() => {
      setHistory([]);
      setResult('');
      setClearExpressionState((prev) => !prev);
  }, []);

  return (
    <Grid spacing={2} container>
      <Grid item xs={12}>
        <Typography variant="h3">React Calculator</Typography>
      </Grid>
      <Grid item xs={12}>
        <ExpressionInput handleSubmit={calculateResult} clearExpressionState={clearExpressionState} />
      </Grid>
      <Grid item xs={12}>
        <Results content={result} history={history} onClear={handleClear} />
      </Grid>
    </Grid>
  );
};
