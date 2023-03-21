import { formatTodo, generateColor, generateID, TodoItem, validateTodo } from "./todo";


describe("generate id", () => {
    it("generated id is random", () => {
      const result1 : string = generateID();
      const result2 : string = generateID();
      expect(result1 === result2).toBe(false);
    });
  });

describe("validate todo", () => {
    const todoList:TodoItem[] = [{
        id: "2h5bs",
        value: "Hund Gassi gehen",
        done:false
    }];

    it("value > 255 returns false", () => {
        const result = validateTodo({id: "2h5bs",
        value: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimatae",
        done:false},todoList)
        expect(result).toBe(false);
    });
    it("value < 255 returns true", () => {
        const result = validateTodo({id: "2h5bs",
        value: "Test",
        done:false},todoList)
        expect(result).toBe(true);
    });
    it("value = 255 returns true", () => {
        const result = validateTodo({id: "2h5bs",
        value: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata",
        done:false},todoList)
        expect(result).toBe(true);
    });
    it("value empty returns false", () => {
        const result = validateTodo({id: "2h5bs",
        value:"",
        done:false},todoList)
        expect(result).toBe(false);
    });
    it("value not empty returns true", () => {
        const result = validateTodo({id: "2h5bs",
        value:"a",
        done:false},todoList)
        expect(result).toBe(true);
    });
    it("todo (casesensitive) already in todolist returns false", () => {
        const result = validateTodo({id: "2h5bs",
        value:"Hund Gassi gehen",
        done:false},todoList)
        expect(result).toBe(false);
    });
    it("todo (caseinsensitive) already in todolist returns false", () => {
        const result = validateTodo({id: "2h5bs",
        value:"hund gassi gehen",
        done:false},todoList)
        expect(result).toBe(false);
    });
    it("todo not in todolist returns true", () => {
        const result = validateTodo({id: "2h5bs",
        value:"hund des Nachbarn gassi gehen",
        done:false},todoList)
        expect(result).toBe(true);
    });
});

describe("format todo", () => {
    it("first letter is not capitalized yet", () => {
      const result = formatTodo({
        id: "e3j3d",
        value:"hund Gassi gehen",
        done: false
    }).value
      expect(result).toBe("Hund Gassi gehen");
    });
    it("first letter is already capitalized", () => {
        const result = formatTodo({
            id: "e3j3d",
            value:"Hund Gassi gehen",
            done: false
        }).value
          expect(result).toBe("Hund Gassi gehen");
      });
  });

describe("generate color", () => {
    it("all values are between 50 and 150", () => {
        const result = generateColor();
        const split = result.split(",");    
        const r = Number(split[0].slice(4));
        const g = Number(split[1]);
        const b = Number(split[2].split(")")[0]);
        let boolresult = true;
        if(!((50<=r)&&(r<=150))){
            boolresult = false
        }
        if(!((50<=g) && (g<=150))){
            boolresult = false
        }
        if(!((50<=b) && (b<=150))){
            boolresult = false
        }
        expect(boolresult).toBe(true);
    });

    it("colors are random", () => {
        const result1 : string = generateColor();
        const result2 : string = generateColor();
        expect(result1 === result2).toBe(false);
    });
});