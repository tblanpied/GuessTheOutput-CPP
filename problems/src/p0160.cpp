#include <iostream>

int main()
{
    int x{};

    std::cout << "x? ";
    std::cin >> x;

    if (x > 0)
        std::cout << "P";
        std::cout << "Q\n";

    return 0;
}
