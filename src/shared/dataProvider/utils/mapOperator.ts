import { CrudOperators } from "@refinedev/core";

export const mapOperator = (operator: CrudOperators): string => {
    switch (operator) {
        case "ne":
            return ".ne";
        case "in":
            return ".in";
        case "gt":
            return ".gt";
        case "gte":
            return ".gte";
        case "lt":
            return ".lt";
        case "lte":
            return ".lte";
        case "contains":
            return ".contains";
        case "null":
            return ".null";
        case "startswith":
            return '.st';
        default:
            return operator;
    }
};