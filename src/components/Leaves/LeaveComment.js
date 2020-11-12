import React from 'react';
import { TextField } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

function LeaveComment({ disabled, comment, changeComment }) {
  const { t } = useTranslation('Leaves');

  return (
    <TextField
      disabled={disabled}
      label={t('Comment')}
      variant="standard"
      fullWidth
      multiline
      className="form-input"
      value={comment}
      onChange={(e) => changeComment(e)}
      style={{ marginBottom: 20, marginTop: 20, width: '100%' }}
    />
  );
}

export default LeaveComment;
