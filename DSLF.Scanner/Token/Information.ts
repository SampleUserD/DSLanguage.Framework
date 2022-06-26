type Placement = { row: number, column: number }
type Offset = { offset: number }

type Information = { placement: Placement, offset: Offset }

const CreatePlacementInformation = (row: number, column: number): Placement  => ({ row, column })
const CreateInformation = (placement: Placement, offset: Offset): Information => ({ placement, offset })

export { Placement, Information as Base }
export { CreatePlacementInformation as CreatePlacement, CreateInformation as Create } 