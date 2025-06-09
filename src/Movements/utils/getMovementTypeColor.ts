export default function getMovementTypeColor(
  movementType?: "WITHDRAW" | "PAY" | "RENDITION" | "EXPENSE" | string
) {
  switch (movementType) {
    case "BUY": {
      return "green";
    }
    case "APLICATION": {
      return "yellow";
    }
    case "SEEDING": {
      return "purple";
    }
    case "RENDITION": {
      return "red";
    }
    case "EXPENSE": {
      return "orange";
    }
    default: {
      return undefined;
    }
  }
}
