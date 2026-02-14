#include <iostream>

int main()
{
    std::cout << "Data: ";

    char c1{};
    char c2{};
    char c3{};

    std::cin.get(c1);
    std::cin.get(c2);
    std::cin.get(c3);

    std::cout << '[' << c1 << "]\n";
    std::cout << '[' << c2 << "]\n";
    std::cout << '[' << c3 << "]\n";

    return 0;
}
