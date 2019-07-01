import { Genome } from './Genome'
import { SimulatorConfig } from './Config'

export class Creature {

    private position        : number[];
    private mTargetPosition : number[];
    private mGenome         : Genome;
    private energy          : number;

    constructor() {
        this.mGenome = new Genome();
        this.mTargetPosition = [0,0];
        this.position = [0,0];
        this.energy = 1;
    }

    public isSameSpecies(creature : Creature) : boolean {
        return this.mGenome.distanceTo(creature.mGenome) < SimulatorConfig.speciesMaxDistance;
    }

    public static fromParents(daddy : Creature, mum : Creature) : Creature {
        let genomeC = new Genome();
        genomeC.crossOver(daddy.mGenome, mum.mGenome);
        genomeC.mutate();
        let creature = new Creature();
        creature.mGenome = genomeC;
        return creature;
    }

    public update() : void {
        if(this.energy <= 0) {
            return;
        }
        if(this.hasArrivedAtTargetPos()) {
            this.findNewTargetPosition();
        } else {
            this.moveTowardsTargetPosition();
        }
        this.energy -= 0.001;
    }

    public moveTowardsTargetPosition() : void {
        let dirVec = [
            this.mTargetPosition[0] - this.position[0],
            this.mTargetPosition[1] - this.position[1]
        ];
        let len = Math.sqrt(dirVec[0] * dirVec[0] + dirVec[1] * dirVec[1]);
        let normalizedDirVec = [dirVec[0]/len, dirVec[1]/len];
        let step = [
            normalizedDirVec[0] * this.mGenome.mSpeed,
            normalizedDirVec[1] * this.mGenome.mSpeed,
        ];
        let stepLength = Math.sqrt(step[0] * step[0] + step[1] * step[1]);
        if(stepLength > len) {
            this.position[0] = this.mTargetPosition[0];
            this.position[1] = this.mTargetPosition[1];
        } else {
            this.position[0] += step[0];
            this.position[1] += step[1];
        }
    }

    public findNewTargetPosition() : void {
        let angle = Math.random() * (Math.PI * 2);
        let stepSizeInMts = 5;
        let x = Math.cos(angle) * stepSizeInMts;
        let y = Math.sin(angle) * stepSizeInMts;
        this.mTargetPosition[0] = this.position[0] + x;
        this.mTargetPosition[1] = this.position[1] + y;
    }

    public hasArrivedAtTargetPos() : boolean {
        return this.position[0] === this.mTargetPosition[0] &&
        this.position[1] === this.mTargetPosition[1];
    }

    public getPosition() : number[] {
        return this.position;
    }

    public getSize() : number {
        return this.mGenome.mSize;
    }

    public isDead() : boolean {
        return this.energy <= 0;
    }
}