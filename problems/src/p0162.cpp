#include <iostream>

int main()
{
    int x{};
    std::cout << "x? ";
    std::cin >> x;

    if (x > 0)
        std::cout << "A\n";
    else if (x < 0)
        std::cout << "B\n";
    else
        std::cout << "C\n";

    return 0;
}
