#include <iomanip>
#include <iostream>

int main()
{
    double x{ 12.34567 };

    std::cout << std::setprecision(3);
    std::cout << x << '\n';

    std::cout << std::fixed << std::setprecision(3);
    std::cout << x << '\n';

    return 0;
}
