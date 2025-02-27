import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Grid,
  Chip,
  Link,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DownloadIcon from '@mui/icons-material/Download';
import { Transfer, TransferStatus } from '../types';

interface TransferDetailsModalProps {
  open: boolean;
  onClose: () => void;
  transfer: Transfer | null;
  onDownload: () => void;
}

const getStatusColor = (status: TransferStatus): string => {
  const statusColors = {
    PENDING: '#ff9800',
    COMPLETED: '#4caf50',
    AWAITING_APPROVAL: '#2196f3',
    REJECTED: '#f44336',
    SCHEDULED: '#9c27b0',
    IN_PREPARATION: '#ff9800',
    IN_TRANSIT: '#2196f3',
    IN_CUSTOMS: '#ff5722',
    QUALITY_CHECK: '#673ab7'
  };
  return statusColors[status] || '#9e9e9e'; // Default gray color if status not found
};

const TransferDetailsModal: React.FC<TransferDetailsModalProps> = ({
  open,
  onClose,
  transfer,
  onDownload,
}) => {
  if (!transfer) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 2 }
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h6">
          Transfer Details - Transfer ID: {transfer.id}
        </Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ color: 'grey.500' }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent dividers>
        <Grid container spacing={3}>
          {/* Status Section */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Typography variant="subtitle1">Status:</Typography>
              <Chip
                label={transfer.status}
                sx={{
                  backgroundColor: getStatusColor(transfer.status),
                  color: 'white',
                }}
              />
            </Box>
          </Grid>

          {/* Transfer Details */}
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>From:</Typography>
            <Typography variant="body1" color="text.secondary">
              {transfer.from.rank} {transfer.from.name}
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>To:</Typography>
            <Typography variant="body1" color="text.secondary">
              {transfer.to.rank} {transfer.to.name}
            </Typography>
          </Grid>

          {/* Items Section */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>Items:</Typography>
            <Box sx={{ mt: 1 }}>
              {transfer.items.map((item) => (
                <Box
                  key={item.id}
                  sx={{
                    p: 2,
                    mb: 1,
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 1,
                  }}
                >
                  <Grid container spacing={2}>
                    {item.thumbnail && (
                      <Grid item xs={12} sm={3}>
                        <img
                          src={item.thumbnail}
                          alt={item.name}
                          style={{
                            width: '100%',
                            height: 'auto',
                            borderRadius: 4,
                          }}
                        />
                      </Grid>
                    )}
                    <Grid item xs={12} sm={item.thumbnail ? 9 : 12}>
                      <Typography variant="subtitle2">{item.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Serial Number: {item.serialNumber}
                      </Typography>
                      {item.digitalTwinId && (
                        <Typography variant="body2" color="text.secondary">
                          Digital Twin ID: {item.digitalTwinId}
                        </Typography>
                      )}
                    </Grid>
                  </Grid>
                </Box>
              ))}
            </Box>
          </Grid>

          {/* Blockchain Info */}
          {transfer.blockchainTxId && (
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Blockchain Verification:
              </Typography>
              <Link
                href={`https://explorer.example.com/tx/${transfer.blockchainTxId}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View on Blockchain Explorer
              </Link>
            </Grid>
          )}

          {/* Attached Files */}
          {transfer.attachedFiles && transfer.attachedFiles.length > 0 && (
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Attached Files:
              </Typography>
              {transfer.attachedFiles.map((file) => (
                <Box
                  key={file.id}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    mb: 1,
                  }}
                >
                  <Link href={file.url} download>
                    {file.name}
                  </Link>
                  <Typography variant="body2" color="text.secondary">
                    ({(file.size / 1024).toFixed(1)} KB)
                  </Typography>
                </Box>
              ))}
            </Grid>
          )}

          {/* Notes */}
          {transfer.notes && (
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>Notes:</Typography>
              <Typography variant="body1" color="text.secondary">
                {transfer.notes}
              </Typography>
            </Grid>
          )}
        </Grid>
      </DialogContent>

      <DialogActions sx={{ p: 2, justifyContent: 'space-between' }}>
        <Button
          startIcon={<DownloadIcon />}
          onClick={onDownload}
          variant="outlined"
        >
          Download Transfer Record
        </Button>
        <Button onClick={onClose} variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TransferDetailsModal; 