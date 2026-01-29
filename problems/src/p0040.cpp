#include <iostream>

int main()
{
    std::cout << "Input: ";

    int a{};
    int b{ 111 };
    int c{ 222 };

    std::cin >> a >> b >> c;

    std::cout << "a=" << a << ", b=" << b << ", c=" << c << '\n';

    return 0;
}
