import { ObjectID } from 'mongodb';

export type Ref<G> = G | ObjectID;
export default Ref;
