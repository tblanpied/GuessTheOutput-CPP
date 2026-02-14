#include <iostream>

int main()
{
    int x{};
    std::cout << "x? ";
    std::cin >> x;

    if (x > 0)
        if (x % 2 == 0)
            std::cout << "even\n";
        else
            std::cout << "odd\n";

    return 0;
}
