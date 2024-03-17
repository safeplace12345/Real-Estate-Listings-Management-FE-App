import { useState } from 'react';
import { useDispatch } from 'react-redux';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { IListing, editListing } from '../services/@redux/listingsReducer';
import { api } from '../services/api';

interface IOwnProps {
  open: boolean,
  item: IListing,
  setOpen: (status: boolean) => void
}

export default function FormDialog(props: IOwnProps) {
  const [data, setData] = useState<any>({})
  const dispatch = useDispatch()
  const handleClose = () => {
    props.setOpen(false);
  };

  const handleChange = (ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    ev.preventDefault()
    const { currentTarget: { value, name } } = ev
    data[name] = value
    setData((prev: any) => ({ ...prev, ...data }))
  }

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const listing = {
      "brokerTitle": props.item.brokerTitle,
      "address": props.item.address,
      "type": props.item.type,
      "updates": data
    }

    return await api.updateListing(listing).then((data: any) => {
      if (!data.ok) {
        dispatch(editListing(listing))
        return handleClose();
      }
      alert("Update Item Failed")
    })
  }

  return (
    <>
      <Dialog
        open={props.open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: submit,
        }}
      >
        <DialogTitle>Edit Item</DialogTitle>
        <DialogContent>
          <DialogContentText>
            "Caution once item deleted cannot be recovered"
          </DialogContentText>
          {Object.entries(props.item).map((item: any) => (
            <TextField
              key={item[0]}
              autoFocus
              margin="dense"
              id={item[0]}
              name={item[0]}
              label={item[0].toUpperCase()}
              type="text"
              fullWidth
              variant="standard"
              defaultValue={item[1]}
              onBlur={handleChange}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" color="success">Complete</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
