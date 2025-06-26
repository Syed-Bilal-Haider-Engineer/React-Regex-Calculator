import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import { ChangeEvent, useEffect, useState } from "react";

interface ExpressionInputProps {
  clearExpressionState: Boolean,
  handleSubmit: (expression: string) => void;
}

export const ExpressionInput: React.FC<ExpressionInputProps> = ({ handleSubmit, clearExpressionState }) => {
  const [expressionState, setExpressionState] = useState<string>('');

  const onExpressionChange = (event:ChangeEvent<HTMLInputElement>) => {
    setExpressionState(event.target.value);
  }

  useEffect(() => {
      setExpressionState('')
  },[clearExpressionState])

  return (
    <Card>
      <CardContent>
        <TextField 
         fullWidth={true} label="Expression"
         value={expressionState} 
         variant="outlined" onChange={onExpressionChange}/>
      </CardContent>
      <CardActions>
        <Button
          data-testid="button"
          color="primary"
          variant="contained"
          onClick={() => handleSubmit(expressionState.trim())}
        >
          Submit
        </Button>
      </CardActions>
    </Card>
  );
};
