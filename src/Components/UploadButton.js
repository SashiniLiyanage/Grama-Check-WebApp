import { Button, ButtonGroup } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton';
import CloudUpload from '@mui/icons-material/CloudUpload';


const UploadButton = ({
    label,
    accept,
    onChange,
    onClick,
    ...options
}) => {
    return (
        <ButtonGroup variant="outlined" color="primary" {...options}>
            <LoadingButton variant="contained" disableElevation sx={ { borderTopRightRadius: 0, borderBottomRightRadius: 0 } } component="label" startIcon={<CloudUpload />}>
                Upload
                <input accept={accept} type="file" hidden onClick={onClick} onChange={onChange} />
            </LoadingButton>
            <Button disabled sx={ { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 } } >
                {label}
            </Button>
        </ButtonGroup>
    );
};

export default UploadButton;