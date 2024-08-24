export interface ISpecies{
    name: string;
    url: string;
}

export interface IChain{
    evolves_to: IChain[];
    species:ISpecies
}
export interface IEvolutionForms{
    chain: IChain;
}