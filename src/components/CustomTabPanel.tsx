import Box from '@mui/material/Box';
interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}  
export default function Tab(props:TabPanelProps){
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            {/* <Typography>{children}</Typography> */}
            {children}
          </Box>
        )}
      </div>
    );

}
