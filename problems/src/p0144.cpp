#include <iostream>
#include <iomanip>

int main()
{
    double x{ 87.0 };
    double y{ 87.000 };

    std::cout << std::fixed;

    std::cout << std::setprecision(1) << x << ' ' << y << '\n';
    std::cout << std::setprecision(3) << x << ' ' << y << '\n';
    return 0;
}
