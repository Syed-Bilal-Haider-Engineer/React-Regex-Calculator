import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import {List, ListItem, ListItemText} from '@mui/material';
import ClearButton from './Button';

interface ResultProps {
  content: number | string;
  history: string[];
  onClear: () => void;
}

export const Results: React.FC<ResultProps> = ({content, history, onClear}) => (
  <Card  data-testid="results">
    <CardContent>
      <Typography variant="h5" gutterBottom>
        Results
      </Typography>
      { typeof content === 'string' && <Typography variant="body1" color="primary"> {content} </Typography>}
     <List 
      component="ol"
      sx={{ 
        listStyleType: 'none',
        pl: 0,
        counterReset: 'list-counter',
      }}
   >
    {history?.map((item: string, index: number) => (
      <ListItem
        key={`${index}-${item}`}
        component="li"
        sx={{
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          pl: 4, 
          '&::before': index === 0 ? {} : {
            content: 'counter(list-counter) "."',
            position: 'absolute',
            left: 0,
            counterIncrement: 'list-counter',
          }
        }}
      >
        {index === 0 && (
          <SubdirectoryArrowRightIcon 
            sx={{ 
              position: 'absolute',
              left: 0,
              color: 'primary.main',
              fontSize: '1.25rem'
            }}
          />
        )}
        <ListItemText primary={item} />
      </ListItem>
    ))}
      </List>
    { (history.length > 0 || content) ? <ClearButton onClick={onClear} label="Erase Result" />: ''}
  </CardContent>
</Card>
);
