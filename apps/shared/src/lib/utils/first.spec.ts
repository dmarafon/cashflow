import { first } from './first' // Replace 'your-module' with the actual module path.

describe('first', () => {
  it('should return the first element of the array', () => {
    // Arrange
    const array = [1, 2, 3]

    // Act
    const result = first(array)

    // Assert
    expect(result).toBe(1)
  })

  it('should return undefined for an empty array', () => {
    // Arrange
    const emptyArray: number[] = []

    // Act
    const result = first(emptyArray)

    // Assert
    expect(result).toBeUndefined()
  })

  // Add more test cases as needed
})
