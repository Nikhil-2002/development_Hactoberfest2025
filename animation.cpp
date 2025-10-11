#include <iostream> // Required for input/output operations
#include <cmath>    // Required for the M_PI constant (for pi) and pow function

int main() {
    double radius;
    double area;

    // Prompt the user to enter the radius
    std::cout << "Enter the radius of the circle: ";

    // Read the radius from user input
    std::cin >> radius;

    // Calculate the area of the circle (Area = pi * r^2)
    area = M_PI * std::pow(radius, 2);

    // Display the calculated area
    std::cout << "The area of the circle with radius " << radius << " is: " << area << std::endl;

    return 0; // Indicate successful program execution
}
