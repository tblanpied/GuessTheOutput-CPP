#include <iostream>

int main()
{
    int x{};
    std::cout << "x? ";
    std::cin >> x;

    if (x)
        std::cout << "T\n";
    else
        std::cout << "F\n";

    return 0;
}
