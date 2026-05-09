export interface iAtom {
    symbol: string;
    name: string;
    atomic_number: number;
    atomic_mass: number;
}


class Atom {
    constructor(
        public symbol: string,
        public name: string,
        public atomic_number: number,
        public atomic_mass: number,
        public wxpos: number,
        public wypos: number
    ){}
}


export default Atom;