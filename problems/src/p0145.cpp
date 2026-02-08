#include <iostream>
#include <iomanip>

int main()
{
    double v{ 0.004000 };

    std::cout << std::scientific << std::setprecision(3) << v << '\n';
    return 0;
}
