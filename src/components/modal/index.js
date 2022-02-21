import NewChannel from './NewChannel.jsx';
import RemoveChannel from './RemoveChannel.jsx';
import RenameChannel from './RenameChannel.jsx';

const modals = {
  newChannel: NewChannel,
  removeChannel: RemoveChannel,
  renameChannel: RenameChannel,
};

export default (modalName) => modals[modalName];
