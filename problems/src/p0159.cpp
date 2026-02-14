#include <iostream>

int main()
{
    bool a{ true };
    bool b{ true };

    std::cin >> std::boolalpha;
    std::cin >> a >> b;

    std::cout << std::boolalpha;
    std::cout << a << ' ' << b << '\n';
}
